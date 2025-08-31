public class IPhone implements ReprodutorMusical, AparelhoTelefonico, NavegadorInternet {

    private String modelo;
    private String numeroSerie;

    public IPhone(String modelo, String numeroSerie) {
        this.modelo = modelo;
        this.numeroSerie = numeroSerie;
    }

    // ReprodutorMusical
    @Override
    public void tocar() {
        System.out.println("Reproduzindo música no iPhone " + modelo + "...");
    }

    @Override
    public void pausar() {
        System.out.println("Música pausada.");
    }

    @Override
    public void selecionarMusica(String musica) {
        System.out.println("Selecionando música: " + musica);
    }

    // AparelhoTelefonico
    @Override
    public void ligar(String numero) {
        System.out.println("Ligando para " + numero + "...");
    }

    @Override
    public void atender() {
        System.out.println("Atendendo ligação.");
    }

    @Override
    public void iniciarCorreioVoz() {
        System.out.println("Abrindo correio de voz...");
    }

    // NavegadorInternet
    @Override
    public void exibirPagina(String url) {
        System.out.println("Exibindo página: " + url);
    }

    @Override
    public void adicionarNovaAba() {
        System.out.println("Nova aba adicionada.");
    }

    @Override
    public void atualizarPagina() {
        System.out.println("Atualizando página atual.");
    }
}