<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamsUsersType extends Model
{
    protected $fillable = [
        'user_id',
        'team_id',
        'type',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
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
    public function teams()
    {
        return $this->hasMany(Team::class);
    }
    public function projectsCategory()
    {
        return $this->hasMany(ProjectsCategory::class);
    }
    public function teamsUsers()
    {
        return $this->hasMany(TeamsUser::class);
    }
}
