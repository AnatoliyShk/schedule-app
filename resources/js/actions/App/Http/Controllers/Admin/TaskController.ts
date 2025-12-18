import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TaskController::index
* @see app/Http/Controllers/Admin/TaskController.php:16
* @route '/admin/task'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/task',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TaskController::index
* @see app/Http/Controllers/Admin/TaskController.php:16
* @route '/admin/task'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaskController::index
* @see app/Http/Controllers/Admin/TaskController.php:16
* @route '/admin/task'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TaskController::index
* @see app/Http/Controllers/Admin/TaskController.php:16
* @route '/admin/task'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TaskController::index
* @see app/Http/Controllers/Admin/TaskController.php:16
* @route '/admin/task'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TaskController::index
* @see app/Http/Controllers/Admin/TaskController.php:16
* @route '/admin/task'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TaskController::index
* @see app/Http/Controllers/Admin/TaskController.php:16
* @route '/admin/task'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Admin\TaskController::store
* @see app/Http/Controllers/Admin/TaskController.php:35
* @route '/admin/task'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/task',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TaskController::store
* @see app/Http/Controllers/Admin/TaskController.php:35
* @route '/admin/task'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TaskController::store
* @see app/Http/Controllers/Admin/TaskController.php:35
* @route '/admin/task'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TaskController::store
* @see app/Http/Controllers/Admin/TaskController.php:35
* @route '/admin/task'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TaskController::store
* @see app/Http/Controllers/Admin/TaskController.php:35
* @route '/admin/task'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const TaskController = { index, store }

export default TaskController