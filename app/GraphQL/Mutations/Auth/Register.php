<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use App\User;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class Register extends Mutation
{
    protected $attributes = [
        'name' => 'auth/Register',
        'description' => 'A mutation for register users'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function args(): array
    {
        return [
            'name'=>['type'=>Type::string()],
            'email'=>['type'=>Type::string()],
            'password'=>['type'=>Type::string()]
        ];
    }

    protected function rules(array $args = []): array
    {
        return [
            'name'=>['required','string','max:30'],
            'email'=>['required','email','unique:users'],
            'password'=>['required','min:6','max:20']
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $user=User::create([
            'name'=>$args['name'],
            'email'=>$args['email'],
            'password'=>bcrypt($args['password']),
        ]);
        return $user?true:false;
    }
}
