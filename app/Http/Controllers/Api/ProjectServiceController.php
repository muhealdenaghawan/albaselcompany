<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\api\ProjectServiceMaterialResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectServiceMaterial;
use App\Enums\UserType;
use App\Http\Resources\ProjectNestedResource;
use App\Models\Project;
use App\Models\ProjectService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProjectServiceController extends Controller
{
    public function store(Request $request)
    {
        

        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'service_id' => 'required|exists:services,id',
            'materials' => 'required|array|min:1',
            'materials.*.material_id' => 'required|exists:materials,id',
            'materials.*.quantity_used' => 'required|integer|min:1',
            'materials.*.price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => trans("api.Validation Error"),
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            $projectService = ProjectService::create([
                'project_id' => $request->project_id,
                'service_id' => $request->service_id,
            ]);
            foreach ($request->materials as $material) {
                ProjectServiceMaterial::create([
                    'project_service_id' => $projectService->id,
                    'material_id' => $material['material_id'],
                    'quantity_used' => $material['quantity_used'],
                    'price' => $material['price'],
                ]);
            }

            $projectService->load([
                'materials.material',
                'project',
                'service'
            ]);

            DB::commit();

            return response()->json([
                'status' => 201,
                'message' => trans("api.Project service and materials stored successfully"),
                'data' => ProjectServiceMaterialResource::collection($projectService->materials),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => trans("api.Something went wrong"),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function indexNested()
    {
        $user = Auth::user();

        $query = Project::with([
            'projectServices.service',
            'projectServices.materials.material'
        ]);

        if ($user->role == UserType::CLIENT()) {
            $query->where('client_id', $user->id);
        }

        $projects = $query->get();

        return response()->json([
            'data' => ProjectNestedResource::collection($projects)->response()->getData(true),
        ]);
    }

    public function calculateProjectCost(Project $project)
    {
        $serviceIds = ProjectService::where('project_id', $project->id)->pluck('id');

        if ($serviceIds->isEmpty()) {
            return response()->json([
                'message' => trans("api.No services or materials found for this project."),
                'cost' => 0,
            ],  Response::HTTP_OK);
        }

        $totalCost = ProjectServiceMaterial::whereIn('project_service_id', $serviceIds)
            ->get()
            ->sum(function ($item) {
                return $item->quantity_used * $item->price;
            });

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Project cost calculated successfully."),
            'cost' => round($totalCost, 2),
        ]);
    }
}
