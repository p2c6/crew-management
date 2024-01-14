<?php

use App\Http\Controllers\SystemAdministrator\CrewsController;
use Illuminate\Support\Facades\Route;

// Route::get('{reactRoutes}', function () {
//     return view('app');
// })->where('reactRoutes', '^((?|api).)*$');

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '.*');
