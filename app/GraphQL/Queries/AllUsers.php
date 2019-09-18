<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\User;
use Closure;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;

class AllUsers extends Query
{
    protected $attributes = [
        'name' => 'allUsers',
        'description' => 'A query'
    ];

    public function type(): Type
    {
        return Type::listOf(\GraphQL::type("User"));
    }

    public function args(): array
    {
        return [

        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $users=User::where("id","!=",auth()->user()->id)->get();
        return $users;
    }
}
