<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        return inertia('team/index');
    }

    public function create()
    {
        return inertia('team/create');
    }

    public function edit($id)
    {
        return inertia('team/Edit', ['id' => $id]);
    }
    public function show($id)
    {
        return inertia('team/Show', ['id' => $id]);
    }
}
