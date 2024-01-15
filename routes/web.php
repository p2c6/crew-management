<?php

use App\Http\Controllers\SystemAdministrator\CrewsController;
use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    return view('app');
})->where('path', '^(?!storage|public).*$');
