class ValidaCPF {
    constructor(cpfEnvidado) { 
        Object.defineProperty(this, "cpfLimpo", {
            writable: false,
            enumerable: true,
            configurable: false,
            // /\D+/g => Essa espressao remove qualquer coisa que não seja numero
            value: cpfEnvidado.replace(/\D+/g, "")
        })
    }

    Sequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }
    geraNovoCPF() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, - 2)
        const digito1 = this.geraDigito(cpfSemDigitos);
        const digito2 = this.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2;
    }
    geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverse = cpfSemDigitos.length + 1;

        for (let stringNumber of cpfSemDigitos) {
            total += reverse * Number(stringNumber);
            reverse--;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : 0;
    }
    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== "string") return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.Sequencia()) return false;
        if (!this.geraNovoCPF())


        return this.novoCPF === this.cpfLimpo;
    }
}

// let validacpf = new ValidaCPF('705.484.450-52');
// if(validacpf.valida()) {
//     console.log('CPF válido')
// } else {
//     console.log('CPF inválido')
// }