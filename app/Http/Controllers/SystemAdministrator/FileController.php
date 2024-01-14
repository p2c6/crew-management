<?php

namespace App\Http\Controllers\SystemAdministrator;

use App\Http\Controllers\Controller;
use App\Models\CrewDocument;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        info($request);
        $request->validate([
            'pdfFile' => 'required|mimes:pdf|max:2048', // PDF file, max size 2MB
        ]);


        $file = $request->file('pdfFile');
        $extension = $file->extension();
        $fileName = \uniqid() . '-' . now()->timestamp . '.' . $extension;
        $folder = \uniqid() . '-' . now()->timestamp;
        $file->move(public_path('uploads/' . $folder), $fileName);

        $original = $file->getClientOriginalName();

        CrewDocument::create([
            'crew_id' => $request->crewId,
            'document_id' => $request->document_id,
            'file_name' => $fileName,
            'original_file_name' => $original,
            'code' => 'code',
            'issued_date' => $request->issued_date,
            'expiry_date' => $request->expiry_date,
            'person_in_charge_user_id' => $request->expiry_date,
        ]);


        // You can store the $fileName in the database or perform other operations as needed.

        return response()->json(['message' => 'File uploaded successfully'], 200);
    }
}
