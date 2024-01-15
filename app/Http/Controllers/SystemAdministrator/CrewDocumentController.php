<?php

namespace App\Http\Controllers\SystemAdministrator;

use App\Http\Controllers\Controller;
use App\Models\Crew;
use App\Models\CrewDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CrewDocumentController extends Controller
{
    public function show($id)
    {
        $crewDocuments = CrewDocument::where('crew_id', $id)
            ->join('documents', 'documents.id', 'crew_documents.document_id')
            ->select(
                'crew_documents.folder',
                'crew_documents.file_name',
                'crew_documents.original_file_name',
                'crew_documents.code',
                DB::raw("DATE_FORMAT(crew_documents.issued_date, '%M %d, %Y') as issued_date_formatted"),
                DB::raw("DATE_FORMAT(crew_documents.expiry_date, '%M %d, %Y') as expiry_date_formatted"),
                DB::raw("DATE_FORMAT(crew_documents.created_at, '%M %d, %Y') as created_at_formatted"),
                'crew_documents.person_in_charge_user_id',
                'documents.document_name',
                'crew_documents.person_in_charge_user_id as full_name',
            )
            ->get();

        return response()->json($crewDocuments, 200);
    }

    public function store(Request $request)
    {
        try {

            $request->validate([
                'pdfFile' => 'required|mimes:pdf|max:2048',
                'document_id' => 'required',
                'doc_no' => 'required',
                'code' => 'required',
                'issued_date' => 'required',
                'expiry_date' => 'required',
            ]);

            if ($request->hasFile('pdfFile')) {
                $file = $request->file('pdfFile');
                $extension = $file->extension();
                $fileName = now()->timestamp . '.' . $extension;
                $folder = \uniqid() . '-' . now()->timestamp;
                $file->move(storage_path('app/public/uploads/' . $folder), $fileName);

                $original = $file->getClientOriginalName();

                CrewDocument::create([
                    'crew_id' => $request->crewId,
                    'document_id' => $request->document_id,
                    'doc_no' => $request->doc_no,
                    'folder' => $folder,
                    'file_name' => $fileName,
                    'original_file_name' => $original,
                    'code' => $request->code,
                    'issued_date' => $request->issued_date,
                    'expiry_date' => $request->expiry_date,
                    'person_in_charge_user_id' => 'System Administrator',
                ]);
            }

            return response()->json(['status' => 'success', 'message' => 'File uploaded successfully'], 200);
        } catch (ValidationException $e) {
            $errors = $e->errors();

            return response()->json(['status' => 'error', 'errors' => $errors], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
