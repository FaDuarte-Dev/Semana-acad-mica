import java.io.*;
import java.util.*;

public class EscolaService {
    private static final String ARQUIVO = "escolas.txt";
    private Scanner scanner = new Scanner(System.in);

    // Cadastra uma ação ambiental de uma escola
    public void cadastrarAcao() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(ARQUIVO, true))) {
            System.out.print("Nome da escola: ");
            String escola = scanner.nextLine();
            System.out.print("Tipo de ação (ex: reciclagem, plantio): ");
            String tipo = scanner.nextLine();
            System.out.print("Quantidade (ex: 50 garrafas, 2 árvores): ");
            int quantidade = Integer.parseInt(scanner.nextLine());
            System.out.print("Data (dd/mm/aaaa): ");
            String data = scanner.nextLine();

            writer.write(escola + ";" + tipo + ";" + quantidade + ";" + data);
            writer.newLine();
            System.out.println("Ação registrada para " + escola + "!");
        } catch (IOException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }

    // Lista todas as ações registradas
    public void listarAcoes() {
        try (BufferedReader reader = new BufferedReader(new FileReader(ARQUIVO))) {
            String linha;
            System.out.println("\n--- AÇÕES REGISTRADAS ---");
            while ((linha = reader.readLine()) != null) {
                String[] dados = linha.split(";");
                System.out.println("Escola: " + dados[0] + 
                               " | Ação: " + dados[1] + 
                               " | Quantidade: " + dados[2] + 
                               " | Data: " + dados[3]);
            }
        } catch (IOException e) {
            System.out.println("Erro ao ler arquivo: " + e.getMessage());
        }
    }

    // Filtra ações por tipo (ex.: "reciclagem")
    public void buscarPorTipo() {
        System.out.print("Digite o tipo de ação (ex: plantio): ");
        String tipoBusca = scanner.nextLine();
        try (BufferedReader reader = new BufferedReader(new FileReader(ARQUIVO))) {
            String linha;
            boolean encontrou = false;
            while ((linha = reader.readLine()) != null) {
                String[] dados = linha.split(";");
                if (dados[1].equalsIgnoreCase(tipoBusca)) {
                    System.out.println("Escola: " + dados[0] + 
                                    " | Quantidade: " + dados[2] + 
                                    " | Data: " + dados[3]);
                    encontrou = true;
                }
            }
            if (!encontrou) {
                System.out.println("Nenhuma ação encontrada para: " + tipoBusca);
            }
        } catch (IOException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }

    // Exibe o ranking de escolas por total de ações
    public void exibirRanking() {
        Map<String, Integer> ranking = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(ARQUIVO))) {
            String linha;
            while ((linha = reader.readLine()) != null) {
                String[] dados = linha.split(";");
                String escola = dados[0];
                int quantidade = Integer.parseInt(dados[2]);

                ranking.put(escola, ranking.getOrDefault(escola, 0) + quantidade);
            }

            // Ordena o ranking por quantidade (decrescente)
            List<Map.Entry<String, Integer>> listaRanking = new ArrayList<>(ranking.entrySet());
            listaRanking.sort((a, b) -> b.getValue().compareTo(a.getValue()));

            System.out.println("\n--- RANKING DE ESCOLAS ---");
            for (int i = 0; i < listaRanking.size(); i++) {
                System.out.println((i + 1) + "º Lugar: " + 
                                listaRanking.get(i).getKey() + 
                                " | Total de Ações: " + 
                                listaRanking.get(i).getValue());
            }

        } catch (IOException e) {
            System.out.println("Erro ao gerar ranking: " + e.getMessage());
        }
    }
}
