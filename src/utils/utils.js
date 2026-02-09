module.exports = {
    format: (number, type = 1) => {
        if(type == 1) {
            if (number >= 1e12) {
                return (number / 1e12).toFixed(1) + 'tr';
            } else if (number >= 1e9) {
                return (number / 1e9).toFixed(1) + 'mr';
            } else if (number >= 1e6) {
                return (number / 1e6).toFixed(1) + 'm';
            } else if (number >= 1e3) {
                return (number / 1e3).toFixed(1) + 'k';
            } else {
                return Number(number).toString();
            }
        } else if (type == 2) {
            return Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else if (type == 3) {
            const format = (num, suffix) => {
                const rounded = (num).toFixed(1);
                return (rounded.endsWith(".0") ? parseInt(rounded) : rounded) + suffix;
            };

            if (number >= 1e12) {
                return format(number / 1e12, "tr");
            } else if (number >= 1e9) {
                return format(number / 1e9, "mr");
            } else if (number >= 1e6) {
                return format(number / 1e6, "m");
            } else if (number >= 1e3) {
                return format(number / 1e3, "k");
            } else {
                return Number(number).toString();
            }
        }
    },
    chipsGenerator: (balance) => {
        const minEffectiveBalance = 10000;
        const effectiveBalance = Math.max(balance, minEffectiveBalance);

        const standardChips = [
            50, 100, 250, 500, 1000, 2500, 5000, 10000,
            25000, 50000, 100000, 250000, 500000, 1000000
        ];

        const targetMaxChip = Math.ceil(effectiveBalance / 10 / 50) * 50;

        let nearestIndex = standardChips.findIndex(c => c >= targetMaxChip);
        if (nearestIndex === -1) nearestIndex = standardChips.length - 1;

        let startIndex = Math.max(0, nearestIndex - 3);
        let chips = standardChips.slice(startIndex, nearestIndex + 1);

        while (chips.length < 4) {
            chips.unshift(50);
        }

        return chips;
    },
    waitForState: async(getter, expected) => {
        return new Promise(resolve => {
            var interval = setInterval(() => {
                if (getter() == expected) {
                    clearInterval(interval);
                    resolve();
                }
            }, 2000);
        });
    }
}