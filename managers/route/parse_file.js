    router.get('/[@appName]/[@routeName]/', [@modelName]RestHandlers.get);
    router.get('/[@appName]/[@routeName]/:id', [@modelName]RestHandlers.getOne);
    router.put('/[@appName]/[@routeName]/:id', [@modelName]RestHandlers.put);
    router.post('/[@appName]/[@routeName]/', [@modelName]RestHandlers.post);
    router.delete('/[@appName]/[@routeName]/:id', [@modelName]RestHandlers.delete);