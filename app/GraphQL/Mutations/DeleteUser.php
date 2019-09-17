<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\User;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class DeleteUser extends Mutation
{
    protected $attributes = [
        'name' => 'deleteUser',
        'description' => 'A mutation'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function args(): array
    {
        return [
            'id'=>['type'=>Type::nonNull(Type::int())]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $user=User::find($args['id']);
        if (!$user)
            return false;
        if ($user->avatar && file_exists(public_path($user->avatar))){
            unlink(public_path($user->avatar));
        }
        return $user->delete();
    }
}
