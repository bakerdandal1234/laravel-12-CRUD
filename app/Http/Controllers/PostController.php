<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Posts;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Posts/Index', [
            'posts' => Posts::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:3',
            'content' => 'required|string|min:12',
        ]);

        $user_id = Auth::user()->id;
        $post = new Posts();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = $user_id;
        $post->save();
        
        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Posts::findOrFail($id);

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Posts/Update', [
            'post' => Posts::findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'sometimes|string',
            'content' => 'sometimes|string',
        ]);
        $post = Posts::findOrFail($id);
        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return redirect()->route('posts.index')->with('message', 'Post updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Posts::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index')->with('message', 'Post deleted successfully.');
    }
}
