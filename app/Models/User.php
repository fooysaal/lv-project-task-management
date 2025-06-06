<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'company_id',
        'user_type_id',
        'phone',
        'username',
        'avatar',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function userType()
    {
        return $this->belongsTo(UserType::class);
    }

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? asset("storage/{$this->avatar}") : null;
    }

    public function teams()
{
    return $this->belongsToMany(Team::class, 'teams_users');
}


    public function isAdmin()
    {
        return strtolower($this->userType->name ?? '') === 'admin';
    }

    public function isSuperAdmin()
    {
        return strtolower($this->userType->name ?? '') === 'super admin';
    }

    public function isProjectManager()
    {
        return strtolower($this->userType->name ?? '') === 'project manager';
    }

    public function isManager()
    {
        return strtolower($this->userType->name ?? '') === 'manager';
    }

    public function isUser()
    {
        return strtolower($this->userType->name ?? '') === 'user';
    }
}
