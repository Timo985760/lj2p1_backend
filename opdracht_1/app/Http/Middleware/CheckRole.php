<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     * Controleert of de ingelogde gebruiker de vereiste rol bezit.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     * @return Response
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        if (!empty($roles) && !in_array($request->user()->rolename, $roles, true)) {
            abort(403, 'Toegang geweigerd: Je hebt niet de juiste rechten (rol: Magazijnmedewerker vereist) om dit overzicht te bekijken.');
        }

        return $next($request);
    }
}
