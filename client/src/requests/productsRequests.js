export async  function getListProductShort(token) {
    try {
        const response = await fetch(`http://localhost:3000/products/shortList`, {
            method: "Get",
            headers: {
                "XAuthentication-Token":token,
            },
        });
        if (!response.ok) {
            return {ok: false ,value:null ,err:""};
        }
        const promiseData = await response.json();
        return {ok: true,value:promiseData}

    }
    catch (err){
        return {ok: false ,value:null,err:err.message};

    }
}

