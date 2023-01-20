<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Task extends Model
{
    use Notifiable;
    use HasFactory;
    use HasUuids;

    protected $table = 'tasks';
    protected $primaryKey = 'task_id';
    protected $guarded = ['task_id'];
    protected $keyType = 'string';
    public $incrementing = false;

    public $timesStamps = true;

    protected $fillable = ['task', 'detail', 'note_id', 'passed'];

    protected $hidden = ['note_id'];

    protected $attributes = [
        'passed' => false,
    ];
}
