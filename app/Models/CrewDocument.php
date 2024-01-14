<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrewDocument extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function crew()
    {
        return $this->belongsTo(Crew::class);
    }

    public function document()
    {
        return $this->hasOne(Document::class, 'document_id', 'id');
    }
}
