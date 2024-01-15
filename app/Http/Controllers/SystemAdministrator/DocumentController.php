<?php

namespace App\Http\Controllers\SystemAdministrator;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::get();

        return response()->json($documents, 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'document_name' => 'required',
            ]);

            Document::create([
                'document_name' => $request->document_name,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Successfully Document Created.'], 201);
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
        $document = Document::where('id', $id)->first();

        return response()->json($document, 200);
    }

    public function update(Request $request, Document $document)
    {
        try {
            $request->validate([
                'document_name' => 'required',
            ]);

            $document->update([
                'document_name' => $request->document_name,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Successfully Document Updated.'], 200);
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

    public function delete(Document $document)
    {
        try {
            $document->delete();

            return response()->json(['status' => 'success', 'message' => 'Successfully Document Deleted.'], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
