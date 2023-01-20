<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticable;

class User extends Authenticable implements JWTSubject
{
    use Notifiable;
    use HasFactory;
    use HasUuids; //--> untuk user_id

    // konfigurasi model (pK, table_name dll)
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $guarded = ['user_id'];
    protected $keyType = 'string';
    public $incrementing = false;

    public $timesStamps = true;

    protected $fillable = ['email', 'name', 'password'];
    // akan ditiadakan ketika dijadikan response
    protected $hidden = ['password', 'refresh_token', 'created_at', 'updated_at'];

    // set nilai default (nama_column => 'value')
    protected $attributes = [
        'role' => 'user',
        // 'refresh_token' => ''
    ];

    public function note(){
        return $this->hasMany(Note::class, 'user_id');
    }

    // JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
