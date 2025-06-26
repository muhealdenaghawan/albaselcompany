<?php

namespace App\Http\Controllers\api;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\StoreServicesRequest;
use App\Http\Requests\api\UpdateServicesRequest;
use App\Http\Resources\api\ServicesResource;
use App\Models\Service;
use Helper;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ServicesController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role != UserType::EMPLOYEE() && $user->role != UserType::ADMIN()) {
            return response()->json([
                'message' => trans("api.Unauthorized. Employees and Admins only."),
            ], Response::HTTP_FORBIDDEN);
        }
        $services = Service::filterByName(request()->search)
            ->simplePaginate(Helper::PAGINATE_NUMBER);

        if ($services->isEmpty()) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => trans("api.No Services Found"),
            ]);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Service List"),
            'data' => ServicesResource::collection($services)->response()->getData(true),
        ]);
    }

    public function store(StoreServicesRequest $request)
    {
        $service = new Service($request->validated());
        $service->save();

        if ($request->hasFile('image')) {
            $service->addMedia($request->file('image'))
                ->toMediaCollection(Helper::SERVICES_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_CREATED,
            'message' => trans("api.Service Created Successfully"),
            'data' => ServicesResource::make($service),
        ]);
    }

    public function update(UpdateServicesRequest $request, Service $service)
    {
        $service->update($request->validated());
        if ($request->hasFile('image')) {
            $service->clearMediaCollection(Helper::SERVICES_COLLECTION);
            $service->addMediaFromRequest('image')->toMediaCollection(Helper::SERVICES_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Service Updated Successfully"),
            'data' => ServicesResource::make($service),
        ]);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.Service Deleted Successfully"),
        ]);
    }
}
