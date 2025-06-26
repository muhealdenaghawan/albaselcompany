<?php

namespace App\Http\Controllers\api;

use App\Enums\ProjectsStatus;
use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\AssignEmploueeRequest;
use App\Http\Requests\api\StoreProjectsRequest;
use App\Http\Requests\api\UpdateProjectsRequest;
use App\Http\Requests\api\UpdatestatusPriceRequest;
use App\Http\Resources\api\ProjectsResource;
use App\Models\Project;
use App\Models\User;
use Helper;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ProjectsController extends Controller
{
    public function index()
    {
        $relations = Helper::getRelations();
        $user = Auth::user();

        $projects = Project::filterByName(request()->search)
            ->with($relations)
            ->simplePaginate(Helper::PAGINATE_NUMBER);

        if ($projects->isEmpty()) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => trans("api.No Projects Found"),
            ]);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Project List"),
            'data' => ProjectsResource::collection($projects)->response()->getData(true),
        ]);
    }

    public function store(StoreProjectsRequest $request)
    {
        $user = $request->user();

        $project = new Project($request->validated());
        $project->user_id = $user->id;
        $project->status = ProjectsStatus::PENDING();
        $project->save();

        if ($request->hasFile('file')) {
            $project->addMedia($request->file('file'))
                ->toMediaCollection(Helper::PROJECTS_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_CREATED,
            'message' => trans("api.Project Created Successfully"),
            'data' => ProjectsResource::make($project),
        ]);
    }

    public function update(UpdateProjectsRequest $request, Project $project)
    {
        $user = $request->user();

        if ($project->status != ProjectsStatus::PENDING()) {
            return response()->json([
                'status' => Response::HTTP_FORBIDDEN,
                'message' => trans("api.Cannot edit project unless it is in pending state."),
            ], Response::HTTP_FORBIDDEN);
        }

        $project->update($request->validated());

        if ($request->hasFile('image')) {
            $project->addMedia($request->file('image'))
                ->toMediaCollection(Helper::PROJECTS_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Project Updated Successfully"),
            'data' => ProjectsResource::make($project),
        ]);
    }

    public function destroy(Project $project)
    {
        $user = Auth::user();

        if ($project->user_id != $user->id) {
            return response()->json([
                'message' => trans("api.Unauthorized. You are not authorized to delete this project."),
            ], Response::HTTP_FORBIDDEN);
        }

        $project->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Project Deleted Successfully"),
        ]);
    }
    public function assign_employee(AssignEmploueeRequest $request, Project $project)
    {
        $user = $request->user();

        $project->update($request->validated());

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Project Assigned Successfully"),
            'data' => ProjectsResource::make($project),
        ]);
    }

    public function update_status_and_price(UpdatestatusPriceRequest $request, Project $project)
    {
        $user = $request->user();

        $project->update($request->validated());

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Project Updated Successfully"),
            'data' => ProjectsResource::make($project),
        ]);
    }
}
