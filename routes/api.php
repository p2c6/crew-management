<?php

use App\Http\Controllers\SystemAdministrator\CrewDocumentController;
use App\Http\Controllers\SystemAdministrator\CrewsController;
use App\Http\Controllers\SystemAdministrator\DocumentController;
use App\Http\Controllers\SystemAdministrator\FileController;
use App\Http\Controllers\SystemAdministrator\RankController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//CREW
Route::controller(CrewsController::class)->group(function () {
    Route::get('/crews', 'index');
    Route::get('/crews/{id}', 'show');
    Route::post('/crews', 'store');
    Route::put('/crews/{crew}', 'update');
    Route::delete('/crew/{crew}', 'delete');
});

//CREW DOCUMENT
Route::controller(CrewDocumentController::class)->group(function () {
    Route::get('/crew-documents/{id}', 'show');
});

//DOCUMENT
Route::controller(DocumentController::class)->group(function () {
    Route::get('/documents', 'index');
    Route::get('/document/{id}', 'show');
    Route::post('/document', 'store');
    Route::put('/document/{document}', 'update');
    Route::delete('/document/{document}', 'delete');
});

//RANK
Route::controller(RankController::class)->group(function () {
    Route::get('/ranks', 'index');
    Route::get('/rank/{id}', 'show');
    Route::post('/rank', 'store');
    Route::put('/rank/{rank}', 'update');
    Route::delete('/rank/{rank}', 'delete');
});

//FILE UPLOAD
Route::post('/upload-crew-document', [FileController::class, 'upload']);
