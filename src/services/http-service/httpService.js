const base_url = 'https://testing.miranapp.com/api'

 const post = async ({ target, body  }) => {
    const token = localStorage.getItem('token')
    try {
        const url = `${base_url}/${target}`;
        const result = await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : null,
            },
            body: JSON.stringify(body)
        })
        return await result.json()

    } catch (error) {
        console.log('error', error)
    }
}

export  const HTTP_REQUEST = {
    post
}