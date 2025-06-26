<?php

namespace App\Http\Controllers\api;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\StoreUserRequest;
use App\Http\Requests\api\UpdateprofileUserRequest;
use App\Http\Requests\api\UpdateUserRequest;
use App\Http\Resources\api\UserResource;
use App\Models\User;
use Helper;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::filterByName(request()->search)
            ->simplePaginate(Helper::PAGINATE_NUMBER);

        if ($users->isEmpty()) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'message' => trans("api.No Users Found"),
            ]);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.User List"),
            'data' => UserResource::collection($users)->response()->getData(true),
        ]);
    }
    public function store(StoreUserRequest $request)
    {
        if ($request->input('role') == UserType::ADMIN()) {
            return response()->json([
                'status' => Response::HTTP_FORBIDDEN,
                'message' => trans("api.Cannot create a user with admin role."),
            ], Response::HTTP_FORBIDDEN);
        }
        $user = new User($request->validated());
        $user->save();

        if ($request->hasFile('image')) {
            $user->addMedia($request->file('image'))
                ->toMediaCollection(Helper::PROFILE_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_CREATED,
            'message' => trans("api.User Created Successfully"),
            'data' => UserResource::make($user),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        if ($user->role == UserType::ADMIN()) {
            return response()->json([
                'status' => Response::HTTP_FORBIDDEN,
                'message' => trans("api.Cannot update an admin user."),
            ], Response::HTTP_FORBIDDEN);
        }
        $user->update($request->validated());
        if ($request->hasFile('image')) {
            $user->clearMediaCollection(Helper::PROFILE_COLLECTION);
            $user->addMediaFromRequest('image')->toMediaCollection(Helper::PROFILE_COLLECTION);
        }
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.User Updated Successfully"),
            'data' => UserResource::make($user),
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->role == UserType::ADMIN()) {
            return response()->json([
                'status' => Response::HTTP_FORBIDDEN,
                'message' => trans("api.Cannot delete an admin user."),
            ], Response::HTTP_FORBIDDEN);
        }
        $user->delete();
        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.User Deleted Successfully"),
        ]);
    }


    public function updateProfile(UpdateprofileUserRequest $request)
    {
        $user = User::findOrFail(Auth::id());

        $user->update($request->validated());

        if ($request->hasFile('image')) {
            $user->clearMediaCollection(Helper::PROFILE_COLLECTION);
            $user->addMediaFromRequest('image')->toMediaCollection(Helper::PROFILE_COLLECTION);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => trans("api.User Updated Successfully"),
            'data' => UserResource::make($user),
        ]);
    }
}
