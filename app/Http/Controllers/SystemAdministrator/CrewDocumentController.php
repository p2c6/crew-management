<?php

namespace App\Http\Controllers\SystemAdministrator;

use App\Http\Controllers\Controller;
use App\Models\Crew;
use App\Models\CrewDocument;
use Illuminate\Http\Request;

class CrewDocumentController extends Controller
{
    public function show($id)
    {
        $crewDocuments = CrewDocument::where('crew_id', $id)
            ->join('documents', 'documents.id', 'crew_documents.document_id')
            ->select(
                'document_name',
                'file_name',
                'original_file_name',
                'code',
                'issued_date',
                'expiry_date'
            )
            ->get();

        return response()->json($crewDocuments, 200);
    }
}
