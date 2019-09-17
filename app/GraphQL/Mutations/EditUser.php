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

class EditUser extends Mutation
{
    protected $attributes = [
        'name' => 'editUser',
        'description' => 'A mutation'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function args(): array
    {
        return [
            'id'=>['type'=>Type::nonNull(Type::int())],
            'name'=>['type'=>Type::string()],
            'email'=>['type'=>Type::string()],
            'password'=>['type'=>Type::string()],
            'is_admin'=>['type'=>Type::boolean()],
            'avatar'=>['type'=>\GraphQL::type("Upload")],
        ];
    }

    protected function rules(array $args = []): array
    {
        $rules=[
            'name'=>["required","string","max:20"],
            'email'=>["required","email"],
        ];
        if ($args['password'] && strlen($args['password'])>0){
            $rules['password']=["required","string","min:6","max:20"];
        }
        return $rules;
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $user=User::find($args['id']);
        if (!$user)
            return false;

        $data=[
            'name'=>$args['name'],
            'email'=>$args['email'],
            'is_admin'=>$args['is_admin']
        ];
        if ($args['password'] && strlen($args['password'])>0){
            $data['password']=bcrypt($args['password']);
        }

        if ($args["avatar"]){
            if ($user->avatar && file_exists(public_path($user->avatar))){
                unlink(public_path($user->avatar));
            }
            $file=$args["avatar"];
            $filePath="/uploads/avatars";
            $fileName=Str::random(25).".".$file->getClientOriginalExtension();
            $fullPath="{$filePath}/{$fileName}";
            $file->move(public_path($filePath),$fileName);
            $data['avatar']=$fullPath;
        };
        $result=$user->update($data);
        return $result;
    }
}
