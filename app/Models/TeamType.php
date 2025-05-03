<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamType extends Model
{
    protected $table = 'teams_users_types';

    protected $fillable = [
        'name',
        'description',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
