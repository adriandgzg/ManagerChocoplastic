<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function listUser()
    {
        //$status =Auth::user();
        $vIdUser = Auth::id();

   
        $admin = collect(\DB::select("
            SELECT a.*, CONCAT(s.stor_identifier, ' - ', s.stor_name) as stor_name FROM admins a left join stores s 
            on a.store_id = s.stor_pk where a.id = " . $vIdUser 
        ))->first();
    

        return response()->json([
            'success' => true,
            'message' => 'Users loaded main1',
            'data' => $admin,
        ], 200);
    }
    public function rolUser($idUser)
    {
        $admin = collect(\DB::select("SELECT permission_id FROM admin_permission p  
        where p.admin_id = " . $idUser . " and p.permission_id = 10 limit 1 "))->first(); 
        
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' => $admin,
        ], 200);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function users()
    {
        $users=Admin::with(['permissions','role'])->get();
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$users,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        //
    }

    /**
     * Assign the specified permissions to admin.
     *
     * @param Request $request
     * @param Admin $admin
     * @return \Illuminate\Http\JsonResponse
     */
    public function permissions(Request $request, Admin $admin)
    {
        $admin->permissions()->sync($request->all());
        $admin->load('permissions');
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$admin,
        ], 200);
    }
    /**
     * Assign the specified role to admin.
     *
     * @param Request $request
     * @param Admin $admin
     * @return \Illuminate\Http\JsonResponse
     */
    public function role(Request $request, Admin $admin)
    {
        $admin->role_id=$request->role_id;
        $admin->save();
        $role=Role::find($request->role_id);
        $admin->permissions()->sync($role->permissions->pluck('id'));
        $admin->load(['permissions','role']);
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$admin,
        ], 200);
    }

    public function usuarioBusiness($idAdmin)
    {
       $stores = \DB::select("select ifnull(store_id,0) as store_id FROM admins where id = " . $idAdmin . " limit 1" ); 
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores[0],
        ], 200);
    }


    public function listUsers()
    {
        /*$stores=User::all();*/
    
       $stores = \DB::select("select id, name, email, phone_number, user_type_id,  gender, stor_fk,
                                        case when user_type_id = 2 then 'Repartidor' 
                                        else 'Cliente' end as user_type from users "); 
        return response()->json([
            'success' => true,
            'message' => 'Users loaded',
            'data' =>$stores,
        ], 200);
    }

    public function updateStatus(Request $request)
    {
        DB::table('users')
                ->where('id', '=', $request->id)
                ->update(array(
                        'user_type_id' => $request->user_type_id)
                        );                       
    }

    public function addAdministrator(Request $request)
    {
        $admin = new Admin();        
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->password = Hash::make($request->password);  

        $admin->save();
    }

    public function updateAdministrator(Request $request)
    {
        
        /*$admin = Admin::findOrFail($request->id);         
       
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->verified = $request->verified;
        if($request->password != '' )
            $admin->password = Hash::make($request->password);  

            
        $admin->save();*/
        if($request->password != '' )
        {
        DB::table('admins')
                ->where('id', '=', $request->id)
                ->update(array(
                        'name' => $request->name,
                        'email'=>$request->email,
                        'verified'=>$request->verified,
                        'password'=>Hash::make($request->password)
                        )
                        );     
        }
        else
        {
            DB::table('admins')
            ->where('id', '=', $request->id)
            ->update(array(
                    'name' => $request->name,
                    'email'=>$request->email,
                    'verified'=>$request->verified,
                    )
                    );     
        }
        
    }

    public function updateBusinessAdministrator(Request $request)
    {
        $admin = Admin::findOrFail($request->id);    

        $admin->store_id = $request->idBusiness;

        $admin->save();      

        
        /*
        if($request->idBusiness == 0)
            $admin->store_id = null;
        else*/
            
        /*if($request->password != '' )
            $admin->password = Hash::make($request->password);  
            */

        
    }
}
