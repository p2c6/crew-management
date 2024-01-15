<?php

namespace App\Http\Controllers\SystemAdministrator;

use App\Http\Controllers\Controller;
use App\Models\Crew;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CrewsController extends Controller
{
    public function index()
    {
        $crews = Crew::get();

        return response()->json($crews, 200);
    }

    public function store(Request $request)
    {
        try {

            $request->validate([
                'rank_id' => 'required',
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email',
                'address' => 'required',
                'birth_date' => 'required',
                'age' => 'required',
            ]);

            Crew::create([
                'rank_id' => $request->rank_id,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'address' => $request->address,
                'birth_date' => $request->birth_date,
                'age' => $request->age,
                'height' => $request->height,
                'weight' => $request->weight,
                'age' => $request->age,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Successfully Crew Created.'], 201);
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
        $crew = Crew::where('id', $id)->first();

        return response()->json($crew, 200);
    }

    public function update(Request $request, Crew $crew)
    {
        try {
            $request->validate([
                'rank_id' => 'required',
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email',
                'address' => 'required',
                'birth_date' => 'required',
                'age' => 'required',
            ]);

            $crew->update([
                'rank_id' => $request->rank_id,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'address' => $request->address,
                'birth_date' => $request->birth_date,
                'age' => $request->age,
                'height' => $request->height,
                'weight' => $request->weight,
                'age' => $request->age,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Successfully Crew Updated.'], 200);
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

    public function delete(Crew $crew)
    {
        try {
            $crew->crewDocuments()->delete();
            $crew->delete();

            return response()->json(['status' => 'success', 'message' => 'Successfully Crew Deleted.'], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
