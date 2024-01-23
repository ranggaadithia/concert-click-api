"use strict";
getUserTicket(req, Request, res, Response, userId, number);
{
    prisma.ticketPurchase.findMany({
        where: {
            purchaserId: Number(userId),
        },
        include: {
            Ticket: {
                select: {
                    name: true,
                    price: true
                },
            },
            Purchaser: {
                select: {
                    firstName: true,
                    lastName: true,
                    phone: true,
                    email: true,
                }
            },
        }
    })
        .then((data) => {
        return data;
    })
        .catch((err) => {
        res.status(400).json(err);
    });
}
//# sourceMappingURL=tempCodeRunnerFile.js.map