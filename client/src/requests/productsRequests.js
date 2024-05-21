async function getListProductShort(params) {
    try {
        const response = await fetch(`http://localhost:3000/products/shortList`, {
            method: "Get",
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

export default {getListProductShort}