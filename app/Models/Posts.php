<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $table = 'posts';
    protected $fillable = ['title', 'content', 'user_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
