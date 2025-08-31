public class Main {
    public static void main(String[] args) {
        IPhone iphone = new IPhone("iPhone (2007)", "SN-001");

        // Reprodutor Musical
        iphone.selecionarMusica("U2 - Vertigo");
        iphone.tocar();
        iphone.pausar();

        // Telefone
        iphone.ligar("+55 19 99999-0000");
        iphone.atender();
        iphone.iniciarCorreioVoz();

        // Navegador
        iphone.exibirPagina("https://www.apple.com");
        iphone.adicionarNovaAba();
        iphone.atualizarPagina();
    }
}