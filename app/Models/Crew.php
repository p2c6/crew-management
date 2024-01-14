<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Crew extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'rank_id',
    //     'first_name',
    //     'middle_name',
    //     'last_name',
    //     'email',
    //     'address',
    //     'birth_date',
    //     'age',
    //     'height',
    //     'weight',
    // ];

    protected $guarded = [];

    public function crewDocuments()
    {
        return $this->hasMany(CrewDocument::class, 'crew_id', 'id');
    }

    public function rank()
    {
        return $this->hasOne(Rank::class, 'rank', 'id');
    }
}
