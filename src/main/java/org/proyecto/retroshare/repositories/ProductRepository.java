package org.proyecto.retroshare.repositories;
import java.util.Optional;
import org.proyecto.retroshare.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long>{
	Optional<Product> findById(Long id);

}
