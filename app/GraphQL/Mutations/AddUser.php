<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\User;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Illuminate\Support\Str;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class AddUser extends Mutation
{

    protected $attributes = [
        'name' => 'addUser',
        'description' => 'A mutation'
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
            'password'=>['type'=>Type::string()],
            'is_admin'=>['type'=>Type::boolean()],
            'avatar'=>['type'=>\GraphQL::type("Upload")],
        ];
    }
    protected function rules(array $args = []): array
    {
        return [
            'name'=>["required","string","max:20"],
            'email'=>["required","email","unique:users"],
            'password'=>["required","string","min:6","max:20"],
        ];
    }

    public function validationErrorMessages(array $args = []): array
    {
        return ['email.unique'=>"ایمیل وارد شده موجود است"];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $fullPath=null;
        if ($args["avatar"]){
            $file=$args["avatar"];
            $filePath="/uploads/avatars";
            $fileName=Str::random(25).".".$file->getClientOriginalExtension();
            $fullPath="{$filePath}/{$fileName}";
            $file->move(public_path($filePath),$fileName);
        };
        $user=User::create([
            'name'=>$args['name'],
            'email'=>$args['email'],
            'password'=>bcrypt($args['password']),
            'is_admin'=>$args['is_admin'],
            'avatar'=>$fullPath
        ]);
        return $user ? true : false;
    }
}
