<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Note extends Model
{
    use Notifiable;
    use HasFactory;
    use HasUuids;

    protected $table = 'notes';
    protected $primaryKey = 'note_id';
    protected $guarded = ['note_id'];
    protected $keyType = 'string';
    public $incrementing = false;

    public $timesStamps = true;

    protected $fillable = ['title', 'description', 'user_id', 'passed'];

    protected $hidden = ['user_id'];

    protected $attributes = [
        'passed' => false,
    ];

    public function task(){
        return $this->hasMany(Task::class, 'note_id');
    }
}
