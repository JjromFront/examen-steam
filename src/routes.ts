interface IApiPaths {
    url: string;
    router: string;
}

export const ApiPaths: IApiPaths[] = [
    {url: "/auth", router: "auth.route"},
    {url: '/task', router: "task.route"}
]