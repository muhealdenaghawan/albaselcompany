<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user->role != UserType::ADMIN()) {
            return response()->json([
                'message' => 'Unauthorized. Admins only.',
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
