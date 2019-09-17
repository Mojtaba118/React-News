<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use Closure;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Illuminate\Support\Facades\Auth;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class Login extends Mutation
{
    protected $attributes = [
        'name' => 'auth/Login',
        'description' => 'A mutation'
    ];

    public function type(): Type
    {
        return \GraphQL::type("Token");
    }

    public function args(): array
    {
        return [
            'email'=>['type'=>Type::string()],
            'password'=>['type'=>Type::string()],
        ];
    }

    protected function rules(array $args = []): array
    {
        return [
            'email'=>['required','email'],
            'password'=>['required','min:6','max:20']
        ];
    }
    public function validationErrorMessages(array $args = []): array
    {
        return [
            'email.required'=>"لطفا ایمیل خود را وارد کنید.",
            'email.email'=>"ایمیل وارد شده معتبر نیست.",
            'password.required'=>"لطفا رمزعبور خود را وارد کنید.",
            'password.min'=>"طول رمز عبور باید حداقل 6 کاراکتر باشد.",
            'password.max'=>"طول رمزعبور نباید بیشتر از 20 کاراکتر باشد."
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        if (!Auth::attempt(['email'=>$args['email'],'password'=>$args['password']]))
            return new Error("نام کاربری یا رمز عبور اشتباه است");
        $user=auth()->user();
        $token=$user->createToken("ReactNews")->accessToken;
        return [
            'token'=>$token
        ];


    }
}
