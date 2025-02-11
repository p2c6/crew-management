<?php

namespace App\Http\Controllers\SystemAdministrator;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Rank;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RankController extends Controller
{
    public function index()
    {
        $ranks = Rank::get();

        return response()->json($ranks, 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'code' => 'required',
                'short_name' => 'required',
                'alias' => 'required',
            ]);

            Rank::create([
                'code' => $request->code,
                'short_name' => $request->short_name,
                'alias' => $request->alias,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Successfully Rank Created.'], 201);
        } catch (ValidationException $e) {
            $errors = $e->errors();

            return response()->json(['status' => 'error', 'errors' => $errors], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $document = Rank::where('id', $id)->first();

        return response()->json($document, 200);
    }

    public function update(Request $request, Rank $rank)
    {
        try {
            $request->validate([
                'code' => 'required',
                'short_name' => 'required',
                'alias' => 'required',
            ]);

            $rank->update([
                'code' => $request->code,
                'short_name' => $request->short_name,
                'alias' => $request->alias,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Successfully Rank Updated.'], 200);
        } catch (ValidationException $e) {
            $errors = $e->errors();

            return response()->json(['status' => 'error', 'errors' => $errors], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function delete(Rank $rank)
    {
        try {
            $rank->delete();

            return response()->json(['status' => 'success', 'message' => 'Successfully Rank Deleted.'], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
