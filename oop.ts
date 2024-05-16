#! usr/bin/env node
import inquirer from "inquirer";

class Seller {
    name: string;
    constructor(name1: string) {
        this.name = name1;
    }
}

class Buyer {
    sellers: Seller[] = [];

    addSeller(obj: Seller) {
        this.sellers.push(obj);
    }
}

// Create some seller instances
const seller1 = new Seller('Alice');
const seller2 = new Seller('Bob');

// Create a buyer instance
const buyers = new Buyer();

// Add sellers to the buyers object
buyers.addSeller(seller1);
buyers.addSeller(seller2);

// Declare the function as async to use await
const bargainingStart = async (buyer: Buyer) => {
    console.log("Welcome to Coming");

    // Display the sellers
    console.log("Available Sellers:");
    buyer.sellers.forEach(seller => {
        console.log(`Seller: ${seller.name}`);
    });

    // Start the Q&A session
    const questions = [
        {
            type: "list",
            name: "select",
            message: "What do you want to buy?",
            choices: ["Standard Baby Dress", "Cheap Prize Baby Dress"]
        },
        {
            type: "input",
            name: "quantity",
            message: "How many do you want to purchase?",
            validate: (input:any) => {
                // Validate the input to be a number
                const num = parseInt(input);
                if (isNaN(num) || num <= 0) {
                    return "Please enter a valid number greater than 0.";
                }
                return true;
            }
        },
        {
            type: "confirm",
            name: "confirmPurchase",
            message: "Are you sure you want to make this purchase?",
            default: false
        }
    ];

    const answers = await inquirer.prompt(questions);

    // Print out the answers
    console.log(`You have selected: ${answers.select}`);
    console.log(`Quantity: ${answers.quantity}`);
    console.log(`Purchase confirmed: ${answers.confirmPurchase ? 'Yes' : 'No'}`);
}

// Call the async function with the buyers object
bargainingStart(buyers);