<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['Register', 'Login', 'Logout']]);
    // }

    public function Register(Request $request)
    {
        $email = Str::lower(trim($request->input("email")));
        $password = trim($request->input("password"));
        $confirm_password = trim($request->input("confirm_password"));

        if (!$email && !$password && !$confirm_password) {
            return $this->ClientError("email, password, confirm_password wajib disertakan");
        }
        if (!$email) {
            return $this->ClientError("email wajib disertakan");
        }
        if (!$password) {
            return $this->ClientError("password wajib disertakan");
        }
        if (!$confirm_password) {
            return $this->ClientError("confirm_password wajib disertakan");
        }
        if ($password !== $confirm_password) {
            return $this->ClientError("confirm_password tidak sesuai");
        }

        try {
            $validator = Validator::make($request->input(), [
                'email' => 'required|unique:users,email',
                "password" => 'required|min:8'
            ], [
                'email.unique' => 'email sudah digunakan',
                "password" => "password minimal 8 karakter"
            ]);

            if ($validator->fails()) {
                $error = $validator->messages()->first();
                return $this->ClientError($error);
            }
            $name = explode('@', $email)[0];

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => bcrypt($password),
            ]);
            if ($user) {
                return $this->Success("", ["title" => "sukses", "msg" => "registrasi berhasil"]);
            }
            return $this->ClientError();
        } catch (\Throwable $th) {
            return $this->ServerError($th);
        }
    }

    public function Login(Request $request)
    {
        $email = Str::lower(trim($request->input("email")));
        $password = trim($request->input("password"));

        if (!$email && !$password) {
            return $this->ClientError("email dan password wajib disertakan");
        }
        if (!$email) {
            return $this->ClientError("email wajib disertakan");
        }
        if (!$password) {
            return $this->ClientError("password wajib disertakan");
        }

        $isRegistered = User::where("email", $email)->get();
        if(count($isRegistered)===0){
            return $this->ClientError("email belum terdaftar");
        }


        try {
            $credentials = ['email' => $email, 'password' => $password];
            $isValid = auth()->validate($credentials);
            if (!$isValid) {
                return $this->ClientError("email atau password salah");
            }

            $claim = User::where("email", $email)->first();
            $token = auth()->claims(["data" => $claim])->attempt($credentials);

            if (!$token) {
                return $this->ServerError("", [
                    "title" => "failed",
                    "msg" => "login gagal"
                ]);
            }

            // return response()->json([
            //     "code" => 200,
            //     "status" => "sukses",
            //     "data" => [
            //         "user" => auth()->guard('api')->user(),
            //         "access_token" => $token,
            //         "token_type" => "bearer"
            //     ],
            //     "message" => ["title" => "sukses", "msg" => "login berhasil"]
            // ], 200)->header('Authorization', 'Bearer '.$token);

            return $this->Success([
                "user" => auth()->guard('api')->user(),
                "access_token" => $token,
                "token_type" => "bearer"
            ], ["title" => "sukses", "msg" => "login berhasil"]);
        } catch (\Throwable $th) {
            return $this->ServerError();
        }
    }

    public function Logout(Request $request)
    {
        try {
            $token = $request->bearerToken();
            if (!$token) {
                return $this->ClientError("harus menyertakan token pada permintaan");
            }

            auth()->logout();
            return $this->Success('', ["title" => "logout", "msg" => "berhasil logout"]);
        } catch (\Throwable $th) {
            return $this->ServerError($th);
        }
    }


    public function RefreshToken()
    {
        try {
            $newToken = auth()->refresh(true);
            if (!$newToken) {
                return $this->ClientError("permintaan tidak valid");
            }
            return $this->Success([
                "user" => auth()->guard('api')->user(),
                "access_token" => $newToken,
                "token_type" => "bearer"
            ]);
        } catch (\Throwable $th) {
            return $this->ServerError();
        }
    }
}
