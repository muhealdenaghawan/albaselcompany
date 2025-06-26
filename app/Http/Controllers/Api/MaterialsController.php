<?php

namespace App\Http\Controllers\api;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\StoreMaterialsRequest;
use App\Http\Requests\api\UpdateMaterialsRequest;
use App\Http\Resources\api\MaterialsResource;
use App\Models\Material;
use Helper;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MaterialsController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role != UserType::EMPLOYEE() && $user->role != UserType::ADMIN()) {
            return response()->json([
                'message' => trans("api.Unauthorized. Employees and Admins only."),
            ], Response::HTTP_FORBIDDEN);
        }
        $materials = Material::filterByName(request()->search)
            ->simplePaginate(Helper::PAGINATE_NUMBER);

        if ($materials->isEmpty()) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => trans("api.No Materials Found"),
                'data' => []
            ]);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Material List"),
            'data' => MaterialsResource::collection($materials)->response()->getData(true),
        ]);
    }

    public function store(StoreMaterialsRequest $request)
    {
        $user = Auth::user();
        if ($user->role != UserType::EMPLOYEE() && $user->role != UserType::ADMIN()) {
            return response()->json([
                'message' => trans("api.Unauthorized. Employees and Admins only."),
            ], Response::HTTP_FORBIDDEN);
        }
        $material = new Material($request->validated());
        $material->save();

        if ($request->hasFile('image')) {
            $material->addMedia($request->file('image'))
                ->toMediaCollection(Helper::MATERIALS_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_CREATED,
            'message' => trans("api.Material Created Successfully"),
            'data' => MaterialsResource::make($material),
        ]);
    }
    public function update(UpdateMaterialsRequest $request, Material $material)
    {
        $user = Auth::user();
        if ($user->role != UserType::EMPLOYEE() && $user->role != UserType::ADMIN()) {
            return response()->json([
                'message' => trans("api.Unauthorized. Employees and Admins only."),
            ], Response::HTTP_FORBIDDEN);
        }
        $material->update($request->validated());
        if ($request->hasFile('image')) {
            $material->clearMediaCollection(Helper::MATERIALS_COLLECTION);
            $material->addMediaFromRequest('image')->toMediaCollection(Helper::MATERIALS_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Material Updated Successfully"),
            'data' => MaterialsResource::make($material),
        ]);
    }

    public function destroy(Material $material)
    {
        $user = Auth::user();
        if ($user->role != UserType::ADMIN()) {
            return response()->json([
                'message' => trans("api.Unauthorized. Admins only."),
            ], Response::HTTP_FORBIDDEN);
        }
        $material->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Material Deleted Successfully"),
        ]);
    }
}
