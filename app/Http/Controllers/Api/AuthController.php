<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\LoginRequest;
use App\Http\Requests\api\RegisterRequest;
use App\Http\Resources\api\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;
use Helper;
use Throwable;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();

            $user = User::create($data);
            $user->role = UserType::CLIENT();
            $user->save();
            $token = $user->createToken($user->email . '-AuthToken')->plainTextToken;
            $defaultImagePath = public_path('default-images/avatar-1.jpg');
            if (File::exists($defaultImagePath)) {
                $user->addMedia($defaultImagePath)
                    ->preservingOriginal()
                    ->toMediaCollection(Helper::PROFILE_COLLECTION);
            }
            DB::commit();
            return response()->json([
                "message" => trans("api.Admin Created Client"),
                "user" => UserResource::make($user),
                "token" => $token,
            ], Response::HTTP_CREATED);
        } catch (Throwable $th) {
            DB::rollBack();

            return response()->json([
                'error' => $th->getMessage(),
            ], 400);
        }
    }

    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->validated();
        $user =  $user = User::query()->where('email', $data['email'])->first();
        if (is_null($user)) {
            return response()->json([
                "message" => trans("api.Email not found"),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if (!Hash::check($data['password'], $user->password)) {
            return response()->json([
                "message" => trans("api.The provided credentials are incorrect."),
            ], Response::HTTP_LOCKED);
        }
        $user->save();
        $token = $user->createToken($user->email . '-AuthToken')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => UserResource::make($user),
        ], Response::HTTP_OK);
    }

    public function logout(): \Illuminate\Http\JsonResponse
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(["message" => trans("api.Unauthenticated."),], Response::HTTP_UNAUTHORIZED);
        }
        $user->tokens()->delete();

        return response()->json(["message" => trans("api.logged out"),], Response::HTTP_OK);
    }
}
