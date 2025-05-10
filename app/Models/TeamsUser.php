<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamsUser extends Model
{
    protected $fillable = [
        'user_id',
        'team_id',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    public function tasks()
    {
        return $this->hasMany(ProjectsTask::class);
    }
}
