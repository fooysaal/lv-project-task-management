<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'description',
        'company_id',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'teams_users')
            ->withTimestamps(); // optional if your pivot table has timestamps
    }

    public function teamType()
    {
        return $this->belongsTo(TeamType::class, 'id');
    }
}
