const createAdministratorSession = async (administratorId: string, refreshToken: string) => {
    return Prisma.administratorSession.create({
        data: {
            admin_id: administratorId
            token: refreshToken,
        },
    });
}