export const userDto = (user)=> {
    return {
        id: user.id,
        name: user.name,
        telegramId: user.telegramId,
        email: user?.email,
        role: user.role
}}