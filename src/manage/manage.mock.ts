export const mockCreateDto = {
    origin: "CAN",
    destination: "LGW",
    cost: 4223,
    duration: 39,
    type: "train",
    display_name: "from CAN to LGW by train"
};

export const mockTripResponse = {
    origin: "CAN",
    destination: "LGW",
    cost: 4223,
    duration: 39,
    type: "train",
    display_name: "from CAN to LGW by train",
    id:"697d1ecb2ada36108b0ad534"
};

export const mockFindAllResponse = [
    {
        origin: "MUC",
        destination: "FRA",
        cost: 20000,
        duration: 27,
        type: "flight",
        displayName: "from MUC to FRA by flight",
        id: "697d1ecb2ada36108b0ad534"
    },
    {
        origin: "CAN",
        destination: "LGW",
        cost: 4133,
        duration: 39,
        type: "train",
        displayName: "from CAN to LGW by train",
        id: "697d23dc7916bc35cecb9d72"
    },
    {
        origin: "CAN",
        destination: "LGW",
        cost: 4223,
        duration: 39,
        type: "train",
        displayName: "from CAN to LGW by train",
        id: "697d2a13d4da7e55c0446108"
    }
];